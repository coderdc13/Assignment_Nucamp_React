import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {


      return (

        <div className="col-md-5 m-1">
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.50) translateY(-50%)'
            }}>
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    </div>
      )
}



function RenderComments({comments, postComment, campsiteId}) {

if (comments)          {
return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
        {comments.map(comment => {
              return(
            <Fade in key={comment.id}>
              <div>
              <p> {comment.text} <br /> 
              --{comment.author} {}
              {new Intl.DateTimeFormat("en-US", { 
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
            </p>
     
        </div>
        </Fade>
      );
            })
          }
          </Stagger>
           {/*} })} */}
                <CommentForm campsiteId={campsiteId} postComment={postComment} />

            </div>);

  }

return(<div></div>);
}


class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };
/*
  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  }


  handleSubmit(values) {
    console.log('Current state is: ' + JSON.stringify(values));
    alert('Current state is: ' + JSON.stringify(values));
}

*/

handleSubmit(values) {
  this.toggleModal();
  this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
}


  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className='fa fa-pencil fa-lg' /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            className='bg-primary text-light'
            toggle={this.toggleModal}
          >
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={value => this.handleSubmit(value)}>
              <Row className='form-group'>
                <Label htmlFor='ratings'>Ratings</Label>
                <Col md={12}>
                  <Control.select
                    name='ratings'
                    className='form-control'
                    model='.ratings'
                  >
                    <option Selected>Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Col>
                  <Label htmlFor='author'>Your Name</Label>
                  <Control.text
                    id='author'
                    model='.author'
                    name='author'
                    className='form-control'
                    placeholder='Your Name'
                    validators={{
                      required, 
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                  }}

                  />
                  <Errors
                    className='text-danger'
                    model='.author'
                    show='touched'
                    component='div'
                    messages={{
                      required: 'Required',
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Col>
                  <Label htmlFor='Comment'>Comment</Label>
                  <Control.textarea
                    name='comment'
                    model='.comment'
                    id='comment'
                    rows='6'
                    className='form-control'
                  />
                </Col>
              </Row>
              <Button type='submit' value='submit' color='primary'>
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function CampsiteInfo(props) {

  if (props.isLoading) {
    return (
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    );
}
if (props.errMess) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        </div>
    );
}




if (props.campsite) {

    return(
        //<div className="row">
        //<div className="col-md-5 m-1"> 
        <div className="container">
          <div className="row">
            <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    {/*<RenderComments comments={props.comments} /> */}
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />   
            </div>
            </div>
        );

}

    return(<div></div>);
 
}






export default CampsiteInfo;


/*
NB: most of this work was seen the workshop. Specifically, the student author paid attention when the classmates and Instructor shared their screens. Most of the work here (about 99.999%) is from other sources, which will be specified in later attempts/iterations of this assignment... Specifically, student author saw/experimented from the shared screens and lectures of Instructor HE ... Furthermore, Instructor HE provided the answer for dark mode, for which the student author is grateful...
*/


