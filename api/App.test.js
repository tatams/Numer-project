const request = require('supertest');
const app = require('./index');

describe('API-random path', ()=>{
    it('Bisection should return database in mongodb', async ()=>{
        const t = await request(app).post('/token')
        console.log(t._body.token);
        // console.log(t.data.token);
        const token = t._body.token
        const Data = {
            pages: "Bisection",
            Equation: "(x^4)-1",
            headers: {authorization: `${token}`}
          };
        console.log(Data);
          const res = await request(app)
            .post('/random')
            // .send({ pages: "Bisection", Equation: "(x^4)-1"}, {headers: {authorization: `${token}`}});
            .send(Data)
            // expect(res.statusCode).toBe(201);
            // expect(res.body).toHaveProperty('_id');
            console.log(res.body);
            expect(res.body).toHaveProperty('fx', "(x^4)-1");
            expect(res.body).toHaveProperty('xl', -1);
            expect(res.body).toHaveProperty('xr', 2);
    })
    it('OnePoint should return database in mongodb', async ()=>{
        const t = await request(app).post('/token')
        console.log(t._body.token);
        // console.log(t.data.token);
        const token = t._body.token
        const Data = {
            pages: "OnePoint",
            Equation: "cos(x)",
            headers: {authorization: `${token}`}
          };
        console.log(Data);
          const res = await request(app)
            .post('/random')
            // .send({ pages: "Bisection", Equation: "(x^4)-1"}, {headers: {authorization: `${token}`}});
            .send(Data)
            // expect(res.statusCode).toBe(201);
            // expect(res.body).toHaveProperty('_id');
            console.log(res.body);
            expect(res.body).toHaveProperty('eq', "cos(x)");
            expect(res.body).toHaveProperty('x1', 2);
    })
})
