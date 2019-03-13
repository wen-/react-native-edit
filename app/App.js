import React from 'react';
import storage from 'tools/storage';
import dva from 'dva-no-router';
import { createLogger } from 'redux-logger';
import Router from './Router';
import Models from './dvaModel';

const app = dva({
  initialState: {},
  onAction: createLogger({
    collapsed: true,
  })
});

Object.keys(Models).map((key) => {
  app.model(Models[key]);
  return null;
});

app.router(() => (<Router {...this.props} />));

export default app.start();
