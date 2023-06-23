import React from 'react'

function CardComponent({name , icon, color, total}) {
  return (
    <div className="col-sm-6">
    <div className={`card  ${color}`}>
      <div className="card-body">
        <div className="row">
          <div className="col mt-0">
            <h5 className="card-title text-white">{name}</h5>
          </div>
          <div className="col-auto">
            <div className="stat text-primary">
              <i className={` ${icon} text-white fa-2x`} data-feather="fas fa-user"></i>
            </div>
          </div>
        </div>
        <h1 className="mt-1 mb-3 text-white">{total}</h1>

      </div>
    </div>

  </div>
  )
}

export default CardComponent
