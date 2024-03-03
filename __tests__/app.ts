import supertest, { Request, Response } from 'supertest';
import { test, it, describe, expect, beforeAll, afterAll } from '@jest/globals';

import mongoose from 'mongoose';
import app from '../src/app'
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.ATLAS 

beforeAll(async () => {
    await mongoose.connect(`${DB_URL}`);
  }, 50000);

let token: any
    const payload: {
        email: string;
        password: string;
      } = {
        email: 'dpqb12haikuo@gmail.com',
        password: '1312145@mybrand',
      };
  const testUser = {
    "email": "testuser1@ail.com",
    "password": "1312145asdf" 
}
    const testAdmin = {
      email: "testadmin@gmail.com",
      password: "testadmin123",
      // role: "Admin"
    }
    let singlePost: any;
    let comment: any;
  describe('Testing API', () => {
    
    it('Basic user Logging in', async () =>{
      const response = await supertest(app).post('/api/users/login').send(testUser).set('email', testUser.email).set('password', testUser.password);
      expect(response.body.status).toContain('Success')
    }, 10000)
    it('getting All posts/blogs', async () => {
      const response = await supertest(app).get('/api/blogs')
      expect(response.body.status).toContain('Success');
    });
    it('Admin Log in', async () =>{
      const response = await supertest(app).post('/api/users/login').send(testAdmin).set('email', testAdmin.email).set('password', testAdmin.password);
      token = response.body.token
      expect(response.body.status).toContain('Success')
    })
   

      

  it('posting A blog or any thing', async () => {
    
              let res =  await supertest(app)
      .post('/api/blogs/new')
      .send({
        title: 'intergation',
        image: 'somegibberjabber.jps',
        content: 'Testing',
      })
      .set( "authorization", 'bearer ' + token)
      .set('email', testAdmin.email)
      .set('password', testAdmin.password);
    singlePost = res.body;
    expect(res.body.status).toContain('Success');
  });
  
      it('Getting single post or fetch', async () => {
        const res = await supertest(app).get(`/api/blogs/${singlePost.id}`);
        expect(res.statusCode).toBe(200);
      });
    it('Given the user is an adming and wants to get all users | should return "Success"',async () => {
      const Admin =  await supertest(app).post('/api/users/login').send(testAdmin).set('email', testAdmin.email).set('password', testAdmin.password); 
    const token = Admin.body.token
              let res =  await supertest(app)
      .get('/api/users')
      .set( "authorization", 'bearer ' + token)
      .set('email', testAdmin.email)
      .set('password', testAdmin.password);
    expect(res.body.status).toContain('Success');
  })


  it('Deleting a single blog that does not exist will give 401', async () =>{
    const Admin =  await supertest(app).post('/api/users/login').send(testAdmin).set('email', testAdmin.email).set('password', testAdmin.password); 
      const token = Admin.body.token
    const res = await supertest(app).delete(`/api/blogs/delete/${singlePost.id}`)
    .set( "authorization", 'bearer ' + token)
    .set('email', testAdmin.email)
      .set('password', testAdmin.password);
    expect(res.statusCode).toBe(204)
  })
    

    it('Test how to get all the users of the system',async ()=>{
      //const res = await supertest(app).delete(`/api/blogs/${singlePost.title}`)
    
    const response = await supertest(app)
    .get('/api/users')
    .set( "authorization", 'bearer ' + token)
    expect(response.body.status).toBe('Success')
    })


    it('Adding a comment on a blog', async ()=>{
      const Admin =  await supertest(app).post('/api/users/login').send(testUser).set('email', testUser.email).set('password', testUser.password); 
      const token = Admin.body.token
      const res = await supertest(app)
                  .post(`/api/blogs/${singlePost.id}/comments/new`)
                  .set( "authorization", 'bearer ' + token)
                  .send({comment: "This is the test comment"})
                  .set('email', testUser.email)
                  .set('password', testUser.password)
              comment = res.body.data.id  
              console.log(res.body)  
          expect(res.body.status).toBe('Success')
    })
    it('Getting all comments on a blog', async () =>{
      const response = await supertest(app).get(`/api/blogs/${singlePost.id}/comments`)
      expect(response.body.status).toContain('Success');
    })
    it('Deleting a comment', async () =>{
      const userLogin =  await supertest(app).post('/api/users/login').send(testUser).set('email', testUser.email).set('password', testUser.password); 
      const token = userLogin.body.token
      const res = await supertest(app)
                  .delete(`/api/blogs/${comment}/comments/delete`)
                  .set( "authorization", 'bearer ' + token)
                  .set('email', testUser.email)
                  .set('password', testUser.password)
      expect(res.body.status).toBe('Success')
    })
    
    it('Editing a comment ', async () =>{
      const userLogin =  await supertest(app).post('/api/users/login').send(testUser).set('email', testUser.email).set('password', testUser.password); 
      const token = userLogin.body.token
      const res = await supertest(app)
                  .patch(`/api/blogs/${comment}/comments/edit`)
                  .send({ comment: 'This is the new and revamped comment'})
                  .set( "authorization", 'bearer ' + token)
                  .set('email', testUser.email)
                  .set('password', testUser.password)
      expect(res.body.status).toBe('Success')
    })
    it('Liking a blog', async ()=>{
      const userLogin =  await supertest(app).post('/api/users/login').send(testUser).set('email', testUser.email).set('password', testUser.password); 
      const token = userLogin.body.token
      const res = await supertest(app)
                  .patch(`/api/blogs/${singlePost.id}/like`)
                  .set( "authorization", 'bearer ' + token)
                  .set('email', testUser.email)
                  .set('password', testUser.password)
                expect(res.body.status).toBe('Success')
    })
    })


      
  