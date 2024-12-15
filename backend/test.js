



const request = require('supertest');
const express = require('express');
const app = require('./app');


// Mock puppeteer and openai
const puppeteer = require('puppeteer');

jest.mock('puppeteer', () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      goto: jest.fn().mockResolvedValue(true),
      $eval: jest.fn().mockResolvedValue('Mock Bio Content'),
      $$eval: jest.fn().mockResolvedValue([
        'Mock Post 1',
        'Mock Post 2',
        'Mock Post 3',
      ]),
      close: jest.fn().mockResolvedValue(true),
    }),
    close: jest.fn().mockResolvedValue(true),
  }),
}));


jest.mock('openai', () => {
  return {
    Configuration: jest.fn(),
    OpenAIApi: jest.fn(() => ({
      createCompletion: jest.fn().mockResolvedValue({
        data: {
          choices: [
            { text: 'Mock OpenAI response: This is a creative analysis.' },
          ],
        },
      }),
    })),
  };
});

let server;

beforeAll(() => {
  server = app.listen(0); // Dynamically assign an available port
});

afterAll(() => {
  server.close();
});
describe('POST /generate', () => {
  it('should return a humorous analysis for a valid username', async () => {
    // Use one of the given example usernames
    const res = await request(server)
      .post('/generate')
      .send({ username: 'carolthnh' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toBe('Mock OpenAI response: This is a creative analysis.');
  });

  it('should handle errors gracefully when scraping fails', async () => {
    // Temporarily force puppeteer to fail
    puppeteer.launch.mockResolvedValueOnce({
      newPage: jest.fn().mockResolvedValue({
        goto: jest.fn().mockRejectedValue(new Error('Scraping failed')),
        close: jest.fn().mockResolvedValue(true),
      }),
      close: jest.fn().mockResolvedValue(true),
    });

    const res = await request(server)
      .post('/generate')
      .send({ username: 'hienanh1811' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Error generating response.');
  });

  it('should validate the username input', async () => {
    const res = await request(server)
      .post('/generate')
      .send({ username: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Invalid username.');
  });
});