import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';

it('it renders correctly',()=>{
  const component = renderer.create(
      <App/>
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})