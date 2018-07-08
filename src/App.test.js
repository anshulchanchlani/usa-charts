import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Charts from './ui/Jobs/Charts/Charts';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
it('it renders correctly',()=>{
  const component = renderer.create(
      <App/>
  )
  let tree = component.toJSON();
  
  expect(tree).toMatchSnapshot();
})

it('has one chart component',()=>{
  const wrapper = shallow(<App/>)
  expect(wrapper.contains(<Charts/>)).toEqual(true);
})