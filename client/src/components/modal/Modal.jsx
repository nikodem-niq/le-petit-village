import React, { useState } from 'react';
import Modal from 'react-awesome-modal';

const Modal = (props) => {

    // const [isModal, setModal] = useState(false);

        return (
            <section>
                <h1>React-Modal Examples</h1>
                <Modal visible={props.isModal} width="400" height="300" effect="fadeInUp" onClickAway={() => props.setModal(false)}>
                    <div>
                        <h1>Title</h1>
                        <p>Some Contents</p>
                        <a href="javascript:void(0);" onClick={() => props.setModal(false)}>Close</a>
                    </div>
                </Modal>
            </section>
        );
}

export default Modal;