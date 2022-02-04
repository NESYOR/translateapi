process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.cp');
let should = chai.should();


chai.use(chaiHttp);

/*
  * Test the /POST route
  */
  describe('/POST text', () => {
      it('it should not POST a book without pages field', (done) => {
          let obj = {
              "text": "hello",
              "from": "en",
          }
        chai.request(server)
            .post('/translate')
            .send(obj)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('Bad Request,bad formatted JSON');
              done();
            });
      });

  });


  describe('/POST text', () => {
    it('it should not POST a book without pages field', (done) => {
        let obj = {
            "text":"good night",
            "from":"en",
            "to":"es"
        }
      chai.request(server)
          .post('/translate')
          .send(obj)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('id').eql(45);
                res.body.should.have.property('text');
                res.body.should.have.property('text').eql('good night');
                res.body.should.have.property('lang');
                res.body.should.have.property('lang').eql('en');
                res.body.should.have.property('trans_text');
                res.body.should.have.property('trans_text').eql('Buenas noches');
                res.body.should.have.property('trans_lang');
                res.body.should.have.property('trans_lang').eql('es');
            done();
          });
    });

});
  
  
