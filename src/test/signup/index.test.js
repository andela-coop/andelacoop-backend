// import http from 'chai-http';
import request from 'supertest';
import server from 'chai';

import app from '../../index';

const { expect } = server;

const route = '/api/signup';

describe.only('Signup', () => {
  const user = {
    firstName: 'user 3',
    lastName: 'user 4',
    email: 'user1@test.com',
    password: 'User123456$',
    bankName: 'UBA',
    accountNumber: '12345867',
    dateOfBirth: '07/12/1999',
  };

  it('should create an account', async (done) => {
    request(app)
      .post(route)
      .send(user)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data.userDetails.firstName).to.eql(user.firstName);
        expect(res.body.data.userDetails.lastName).to.eql(user.lastName);
        done();
      });
  });

  it('should return error when password does not meet the criteria', (done) => {
    request(app)
      .post(route)
      .send({ ...user, password: '1234' })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data[0].msg).to.eql('please supply a valid password and must atleast 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, 1 of these special character "[!@#$%^&]" and must be atleast 8 character long');
        done();
      });
  });

  it('should update the details of existing member', (done) => {
    request(app)
      .post(route)
      .send({ ...user, sex: 'male' })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data.userDetails.sex).to.not.eq(null);
        done();
      });
  });
});
