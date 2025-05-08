export const ShowError = ({ error }) => {
  if (error)
    return (
      <div className="alert alert-danger mx-auto text-center">{error}</div>
    );
};

export const ShowSuccess = ({ success, msg }) => {
  if (success)
    return <div className="alert alert-success mx-auto text-center">{msg}</div>;
};

export const ShowLoading = ({ loading }) => {
  if (loading)
    return (
      <div className="alert alert-info mx-auto text-center">Loading.....</div>
    );
};
