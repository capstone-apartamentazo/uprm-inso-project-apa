import React from 'react'


type Props = {

}

const Tour: React.FC<Props> = ({ }) => {

    return (

        <div>
            <label htmlFor="my-modal-3" className="btn">open modal</label>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative flex">
                    <div className='flex-col flex-none w-10 -my-8  bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent'>
                        <br></br>

                    </div>
                    <div className='flex-col  flex-auto '>
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                        <h2 className="text-xl font-bold text-accent">Request a Tour</h2>

                        <div className="form-control pt-5">
                            <label className="label">
                                <span className="label-text font-semibold">Message to landlord</span>
                                
                            </label>
                            <textarea className="textarea shadow-lg ring-stone-200 ring-1 ring-offset-2 focus:outline-none focus:border-0 focus:ring-accent focus:ring-2 focus:ring-offset-2" placeholder="Something asking for tour"></textarea>
                        </div>
                        <div className="modal-action">
                            <label htmlFor="my-modal-3" className="btn text-white bg-accent hover:bg-accent">Submit Request</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default Tour;