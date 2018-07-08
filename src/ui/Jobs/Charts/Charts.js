import React,{Component} from 'react';
import {ColumnChart} from 'react-chartkick'

import states from '../../.././data/states';
import TextField from '@material-ui/core/TextField';
import fetch from 'isomorphic-fetch'
import jobs from '../../../data/jobs'
import { filterDataAccordingToState,
        convertArrayOfJsonObjectsToRequiredFormat,NAME,STATE} from '../../.././utility/utility.js';


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
const convertedData = convertArrayOfJsonObjectsToRequiredFormat(jobs,NAME,states);


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
           this.filterBothCharts(e.target.value,NAME)
        }
        

    }
    filterBothCharts(filterText,key){
        let self =this;
        self.setState({jobsData:filterDataAccordingToState(filterText,convertedData,key, )})
        self.setState({filteredPopulationData:filterDataAccordingToState(filterText,self.state.populationData,key)})

    }

    componentDidMount(){
         var self = this;
         this._isMounted = true;
        fetch('http://localhost:5000/getFileData')
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          const convertedPopulationData = convertArrayOfJsonObjectsToRequiredFormat(myJson,STATE,states);
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

    isValidData(data){
        if(data!==undefined && data!==null && data.constructor===Array && data.length>0){
            return true;
        }else{
            return false;
        }
    }
    render(){
        
        let self = this;
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
        {this.isValidData(self.state.jobsData)?
        <ColumnChart   
            id="chartJobsVsSectors"
            xtitle="Industries" 
            ytitle="Jobs" 
            stacked={true}
            library={options}
            title="Type of jobs within each state"
            discrete={true} 
            data={this.state.jobsData}/>:null}
        

        {this.isValidData(self.state.filteredPopulationData)?
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