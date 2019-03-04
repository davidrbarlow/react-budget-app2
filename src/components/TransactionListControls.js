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

  handleAdd = (e) => {
    console.log('+ button clicked');
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
        <input  className="button--add" id={'addButton'} type="image" src={'/images/add.svg'} 
        alt={'Add'} onClick={this.handleAdd}/>
      </div>
      <div>
        <input  className="show-for-desktop trash-bin" id={'deleteButton'} type="image" src={'/images/delete.svg'} 
        alt={'Delete'}/>
      </div>
      <div>
      <input type="file" name="fileToUpload" id="fileToUpload" 
      className="show-for-desktop"
        onChange={this.handleSelectedFile}
        ref={ref=> this.fileInput = ref}
        ></input>
      <input type="submit" value="Upload CSV" name="submit" 
      onClick={this.handleSubmit} className="show-for-desktop control-button"></input>
      </div>
      
      </div>

    )

  };

};

const mapDispatchToProps = (dispatch) => ({
   startSetTransactions : () => dispatch(startSetTransactions())
   })

export default connect(undefined, mapDispatchToProps)(TransactionListControls);

//export default TransactionListControls;