import http from 'chai-http';
import server from 'chai';
import _ from 'lodash';

import app from '../../index';

const { expect } = server;

server.use(http);

describe('User', () => {
  const user = {
    firstName: 'user 1',
    lastName: 'user 2',
    membershipNo: 123,
    email: 'user@test.com',
    password: 'User123456$',
  };

  it('should create user', (done) => {
    server.request(app)
      .post('/api/user')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data.firstName).to.eql(user.firstName);
        expect(res.body.data.lastName).to.eql(user.lastName);
        expect(res.body.data.membershipNo).to.eql(user.membershipNo);
        expect(res.body.data.email).to.eql(user.email);
        expect(res.body.data).to.not.have.own.property('password');
        done();
      });
  });

  it('should return error when password does not meet the criteria', (done) => {
    server.request(app)
      .post('/api/user')
      .send({ ...user, password: '1234' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data[0].msg).to.eql('please supply a valid password and must atleast 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, 1 of these special character "[!@#$%^&]" and must be atleast 8 character long');
        done();
      });
  });

  it('should return error when no membership No was included', (done) => {
    server.request(app)
      .post('/api/user')
      .send({ ..._.omit(user, ['membershipNo']) })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data[0].msg).to.eql('please supply a valid membership number and must be greater than 0');
        done();
      });
  });

  it('should return error when invalid email is supplied', (done) => {
    server.request(app)
      .post('/api/user')
      .send({ ...user, email: 'tmtp@com' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data[0].msg).to.eql('please supply a valid email address');
        done();
      });
  });
});
