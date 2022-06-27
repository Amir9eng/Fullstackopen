import { connect } from "react-redux"


const Notification = (props) => {

    const notification = props.notification;

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    return <div> {
        notification &&
        <div
        style = { style } > { notification } </div>
    }

    </div>
}

const mapStatetoProps = (state) => {
    return {
        notification: state.notification
    }
}
const ConnectedNotification = connect(mapStatetoProps)(Notification)

export default ConnectedNotification