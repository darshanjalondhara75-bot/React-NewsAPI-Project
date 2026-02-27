import React from 'react'

const Skeleton = () => {
    return (
        <div className="col-md-4 my-3">
            <div className="news-card h-100 p-0">
                <div className="skeleton" style={{ width: '100%', height: '200px' }}></div>
                <div className="card-body">
                    <div className="skeleton mb-2" style={{ width: '80%', height: '24px' }}></div>
                    <div className="skeleton mb-3" style={{ width: '100%', height: '60px' }}></div>
                    <div className="skeleton mb-2" style={{ width: '40%', height: '16px' }}></div>
                    <div className="skeleton" style={{ width: '100px', height: '36px', borderRadius: '8px' }}></div>
                </div>
            </div>
        </div>
    )
}

export default Skeleton
