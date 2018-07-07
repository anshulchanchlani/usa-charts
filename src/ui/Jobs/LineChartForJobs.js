import React,{Component} from 'react';
import {ColumnChart} from 'react-chartkick'
import Button from '@material-ui/core/Button';
import states from '../.././data/states';
import TextField from '@material-ui/core/TextField';
import fetch from 'isomorphic-fetch'
import jobs from '../../data/jobs'
import {convertArrayOfJsonObjectsToRequiredFormatForLineChart, 
        filterDataAccordingToState} from '../.././utility/utility.js';

 
const options = {
    tooltip: { isHtml: false },    // CSS styling affects only HTML tooltips.
    legend: { position: 'right' },
    bar: { groupWidth: '90%',height:'90%' },
    
  };

const convertedData = convertArrayOfJsonObjectsToRequiredFormatForLineChart(jobs,"name");


export default class LineChartForJobs extends Component{
    constructor(props){
        super(props)
        this.state ={jobsData:convertedData,populationData:null,filteredPopulationData:null}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        let filterText = e.target.value;
        let self = this;
        if(filterText===''){
            self.setState({jobsData:convertedData,filteredPopulationData:self.state.populationData});
            
        }else
        
        {
            self.setState({jobsData:filterDataAccordingToState(e.target.value,convertedData,"name",states )})
            self.setState({filteredPopulationData:filterDataAccordingToState(e.target.value,self.state.populationData,"State",states)})
        }
        

    }

    componentDidMount(){
         var self = this;
         this._isMounted = true;
        fetch('http://localhost:5000/getFileData')
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          const convertedPopulationData = convertArrayOfJsonObjectsToRequiredFormatForLineChart(myJson,"State");
          if(self._isMounted)
          {
              self.setState({populationData:convertedPopulationData,filteredPopulationData:convertedPopulationData});
          }
        })
        .catch(function(error){
            console.log( error);
        })
        
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render(){
         
        return(
        <div>
        <TextField
          id="name"
          label="Name"
        
          onChange={this.handleChange}
          margin="normal"
        />
         <Button variant="contained" color="primary">
            Filter
        </Button>
        <ColumnChart   
            xtitle="Industries" 
            ytitle="Value" 
            stacked={true}
            library={options}
            title="Population vs Jobs"
            discrete={true} 
            data={this.state.jobsData}/>
        
        {this.state.filteredPopulationData!==null && this.state.filteredPopulationData.length>0?
        <ColumnChart   
            xtitle = "Year Groups"
            ytitle= "Population"
            title= "Year Group vs US Statewise Population"
            library={options}
            stacked={true}
            data={this.state.filteredPopulationData}/>:null}
        </div>
        )
    }
}