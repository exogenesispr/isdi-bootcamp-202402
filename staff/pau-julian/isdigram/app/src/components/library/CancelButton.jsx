import RoundButton from './RoundButton'

import './CancelButton.sass'

function CancelButton(props) {
    return <RoundButton className="bg-[lightgray]" onClick={props.onClick}>{props.children || 'Cancel'}</RoundButton>
}

export default CancelButton