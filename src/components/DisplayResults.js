import React from 'react';


function PractitionerItem(props){
  const item = props.item;
    return(
      <li className="col-12 col-md-6 col-lg-3">
      <div className="cnt-block equal-hight">
        <figure><img src={item.img} className="img-responsive" alt="{item.name"/></figure>
        <h3><a href="/">{item.name}</a></h3>
        <ul className="clearfix">
          <li><b>City:</b> {item.city}</li>
          <li><b>State:</b> {item.state}</li>
        <li><b>Specialty:</b> {item.specialty}</li>
        <li><b>Keywords:</b> {item.keywords}</li>
        </ul>
      </div>
  </li>
    );
  }
  
  function DisplayResults(props){
    const list = props.list
    return( <section className="our-webcoderskull">
    <div className="container">
      <div className="row heading heading-icon">
          <h2>Found Practioners</h2>
      </div>
      <ul className="row">
        {list.map(item => (
          <PractitionerItem item={item} key={item.name}/>
        ))}
  
      </ul>
    </div>
  </section>
    );
  }

  export default DisplayResults