export const ShowError = ({ error }) => {
    if (error) return <div className="alert alert-danger">{error}</div>
}

export const ShowSuccess = ({ success, msg }) => {
    if (success) return <div className="alert alert-success">{msg}</div>
}

export const ShowLoading = ({ loading }) => {
    if (loading) return <div className="alert alert-info">Loading.....</div>
}