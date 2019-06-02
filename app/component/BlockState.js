import React from 'react'

const BlockState = (props) => {
    return <div className="block-state">
        {
            props.stateList.map((state, i) => <div key={i} className="block-state-item" onClick={state.onClick || null}>
                <div className="block-item-state">{state.state}</div>
                <div className="block-item-head">{state.label}</div>
            </div>)
        }
    </div>
}

export default BlockState