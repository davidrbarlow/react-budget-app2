import React from 'react';
import {connect} from 'react-redux';
import { csvUpload, startSetTransactions, startRemoveTransactions } from '../actions/transactions';
import {toggleAddTransaction} from '../actions/pageEdits';
//import { stat } from 'fs';


class TransactionListControls  extends React.Component {
  //  constructor(props) {
  //    super(props);

    state = {
        selectedFile : '',
        error: false
    };

  //this.handleSubmit = this.handleSubmit.bind(this);       
  //};

  handleSelectedFile = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      error: false
    });
  };

  handleAddRow = () => {
    console.log("pressed*************");
    this.props.toggleAddTransaction();
    
  }

  handleDeleteRows = () => {
    this.props.startRemoveTransactions(this.props.selectedRows);
    
  }

  handleSubmit =  (e) => {
    const data = new FormData();
    data.append('file', this.state.selectedFile, this.state.selectedFile.name);
    
    csvUpload(data)
    .then((res)=>{
      console.log('successfully uploaded ', this.props);
      this.fileInput.value='';
      this.props.startSetTransactions();
    })
    .catch((e)=>{
      console.log('handleSubmit catch ',e);
      // console.log('handleSubmit catch ',res);
      e ? this.setState({error: 'file failed upload'}) : console.log("upload failed");    
      this.fileInput.value='';  
    })
  };


  render(){
    return(

      <div className="controls">
       <div>
        <input  className="button--add" id={'addButton'} type="image" 
        src={this.props.pageEdits.addTransaction ? '/images/subtract.svg' : '/images/add.svg'} 
        alt={'Add'} onClick={this.handleAddRow}/>
      </div>
      <div>
       {this.props.selectedRows.length>0 && <input className={"show-for-desktop trash-bin"} 
        id={'deleteButton'} type="image" 
        src={'/images/delete.svg'} 
        alt={'Delete'}
        onClick={this.handleDeleteRows}
        />}
      </div>
      <div>
      <input type="file" name="fileToUpload" id="fileToUpload" 
      className="show-for-desktop"
        onChange={this.handleSelectedFile}
        ref={ref=> this.fileInput = ref}
        ></input>
      <input type="submit" value="Upload CSV" name="submit" 
      onClick={this.handleSubmit} className="show-for-desktop button"></input>
      </div>
      
      </div>

    )

  };

};

const mapDispatchToProps = (dispatch) => ({
   startSetTransactions : () => dispatch(startSetTransactions()),
   toggleAddTransaction : () => dispatch(toggleAddTransaction()),
   startRemoveTransactions : (ids) => dispatch(startRemoveTransactions(ids))
   });

const mapStateToProps = (state) => ({
    selectedRows: state.selectedRows,
    pageEdits: state.pageEdits
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListControls);

//export default TransactionListControls;