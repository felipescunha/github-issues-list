  import React, { Component } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

   
  import { FaGitAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
  import { Link } from 'react-router-dom';
  
  
  
  import api from '../../services/api';
  
  import Container from '../../components/Container';


  // minified version is also included
  // import 'react-toastify/dist/ReactToastify.min.css';

  class Main extends Component {
    notify = () => toast("Wow so easy !");

    render(){
      return (
        <div>
          <button onClick={this.notify}>Notify !</button>
          <ToastContainer />
        </div>
      );
    }
  }

  export default Main;