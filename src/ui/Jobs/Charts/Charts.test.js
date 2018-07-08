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
    let populationTestArray = [{ "name": "Texas", "data": { "Under 5 Years": "2027307", "5 to 13 Years": "3277946", "14 to 17 Years": "1420518", "18 to 24 Years": "2454721", "25 to 44 Years": "7017731", "45 to 64 Years": "5656528", "65 Years and Over": "2472223" } }]
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

    it('Simulate state of jobs ',()=>{
        wrapper.setState({jobsData:null})
        let testArray =[];
        let testObj = JSON.parse('{"name":"Texas","data":{"agriculture":60,"manufacturing":0,"mining":2,"trade":0,"domestic service":0,"professional service":0}}')
        testArray.push(testObj)
        expect(wrapper.find('#chartJobsVsSectors').length).toEqual(0);
        wrapper.setState({jobsData:testArray})
        expect(wrapper.find('#chartJobsVsSectors').length).toEqual(1);
        wrapper.setState({jobsData:null});
        expect(wrapper.find('#chartJobsVsSectors').length).toEqual(0);
        wrapper.setState({jobsData:undefined});
        expect(wrapper.find('#chartJobsVsSectors').length).toEqual(0);
        wrapper.setState({populationData:undefined});
        expect(wrapper.find('#chartPopulationVsYears').length).toEqual(0);
        wrapper.setState({filteredPopulationData:populationTestArray});
        expect(wrapper.find('#chartPopulationVsYears').length).toEqual(1);
        wrapper.setState({filteredPopulationData:undefined});
        expect(wrapper.find('#chartPopulationVsYears').length).toEqual(0);

    })

})
