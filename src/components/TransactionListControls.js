import React from 'react';
import {connect} from 'react-redux';
import { csvUpload, startSetTransactions } from '../actions/transactions';


class TransactionListControls  extends React.Component {
  // constructor(props) {
  //   super(props);

    state = {
        selectedFile : '',
        error: false
    };

  //this.handleSubmit = this.handleSubmit.bind(this);       
 // };

  handleSelectedFile = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      error: false
    });
  };

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

      <div>
      <img id={'addButton'} src={'/images/add.svg'} 
      alt={'Add'} width={'20'} height={'20'}></img>
      <img id={'deleteButton'} src={'/images/delete.svg'} 
      alt={'Delete'} width={'20'} height={'20'}></img>
  
      <input type="file" name="fileToUpload" id="fileToUpload" 
        onChange={this.handleSelectedFile}
        ref={ref=> this.fileInput = ref}
        ></input>
      <input type="submit" value="Upload CSV" name="submit" onClick={this.handleSubmit}></input>
    
      
      </div>

    )

  };

};

const mapDispatchToProps = (dispatch) => ({
   startSetTransactions : () => dispatch(startSetTransactions())
   })

export default connect(undefined, mapDispatchToProps)(TransactionListControls);

//export default TransactionListControls;