import React from 'react';
import Charts from './Charts';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.mount = mount;
describe('Tests for Chart Component',()=>{
    const wrapper = shallow(<Charts/>)
    it('it renders correctly',()=>{
        const component = renderer.create(
            <Charts/>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it(' jobs vs sectors exists ',()=>{
        expect(wrapper.find('#chartJobsVsSectors').length).toEqual(1)
    })

    it(' Filter field exists',()=>{
        expect(wrapper.find('#filterField').length).toEqual(1)
    })

    it('Simulate onchange of text field',()=>{
         const mockOnChange = jest.fn();
         const event ={
             target:{
                 value:'TX'
             }
         }
         const component  = Enzyme.shallow(<TextField
            id="filterField"
            label="Enter state to filter chart data"
            onChange={mockOnChange}
            fullWidth
            margin="dense"
          />)
         component.find('#filterField').simulate('change',event);
         expect(mockOnChange).toBeCalledWith(event)
    })

})
