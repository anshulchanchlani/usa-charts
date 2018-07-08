import React,{Component} from 'react';
import {ColumnChart} from 'react-chartkick'

import states from '../../.././data/states';
import TextField from '@material-ui/core/TextField';
import fetch from 'isomorphic-fetch'
import jobs from '../../../data/jobs'
import {convertArrayOfJsonObjectsToRequiredFormatForLineChart, 
        filterDataAccordingToState} from '../../.././utility/utility.js';

const NAME = "name";
const STATE = "State"
const options = {
    tooltip: { isHtml: false },    // CSS styling affects only HTML tooltips.
    legend: { position: 'right' },
    bar: { groupWidth: '90%',height:'90%' },
    
  };
const styles ={
    textField:{
        width:'80%',
        marginLeft:'10%'
    }
}
const convertedData = convertArrayOfJsonObjectsToRequiredFormatForLineChart(jobs,NAME);


export default class Charts extends Component{
    constructor(props){
        super(props)
        this.state ={jobsData:convertedData,populationData:null,filteredPopulationData:null}
        this.handleChange = this.handleChange.bind(this)
        this.filterBothCharts = this.filterBothCharts.bind(this)
    }
    handleChange(e){
        let filterText = e.target.value;
        let self = this;
        if(filterText===''){
            self.setState({jobsData:convertedData,filteredPopulationData:self.state.populationData});
            
        }else
        
        {
           this.filterBothCharts(e.target.value,NAME,STATE)
        }
        

    }
    filterBothCharts(filterText,key1,key2){
        let self =this;
        self.setState({jobsData:filterDataAccordingToState(filterText,convertedData,key1,states )})
        self.setState({filteredPopulationData:filterDataAccordingToState(filterText,self.state.populationData,key2,states)})

    }

    componentDidMount(){
         var self = this;
         this._isMounted = true;
        fetch('http://localhost:5000/getFileData')
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          const convertedPopulationData = convertArrayOfJsonObjectsToRequiredFormatForLineChart(myJson,STATE);
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
        <div style={styles.textField}>
        <TextField
          id="filterField"
          label="Enter state to filter chart data"
          onChange={this.handleChange}
          fullWidth
          margin="dense"
        />
        </div>
        <ColumnChart   
            id="chartJobsVsSectors"
            xtitle="Industries" 
            ytitle="Value" 
            stacked={true}
            library={options}
            title="Population vs Jobs"
            discrete={true} 
            data={this.state.jobsData}/>
        
        {this.state.filteredPopulationData!==null && this.state.filteredPopulationData.length>0?
        <ColumnChart   
            id="chartPopulationVsYears"
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