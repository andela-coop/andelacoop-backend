import request from 'supertest';
import server from 'chai';
import _ from 'lodash';

import app from '../../index';

const { expect } = server;

describe('User', () => {
  const user = {
    firstName: 'user 1',
    lastName: 'user 2',
    membershipNo: 123,
    email: 'user@test.com',
    password: 'User123456$',
    sex: 'male',
    middleName: 'user 4',
  };

  it('should get all users', (done) => {
    request(app)
      .get('/api/users')
      .send(user)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        done();
      });
  });
  it('should create user', (done) => {
    request(app)
      .post('/api/user')
      .send(user)
      .expect(201)
      .end((err, res) => {
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
    request(app)
      .post('/api/user')
      .send({ ...user, password: '1234' })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data[0].msg).to.eql('please supply a valid password and must atleast 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, 1 of these special character "[!@#$%^&]" and must be atleast 8 character long');
        done();
      });
  });

  it('should return error when no membership No was included', (done) => {
    request(app)
      .post('/api/user')
      .send({ ..._.omit(user, ['membershipNo']) })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data[0].msg).to.eql('please supply a valid membership number and must be greater than 0');
        done();
      });
  });

  it('should return error when invalid email is supplied', (done) => {
    request(app)
      .post('/api/user')
      .send({ ...user, email: 'tmtp@com' })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data[0].msg).to.eql('please supply a valid email address');
        done();
      });
  });
});
