export default function LoadingButton() {
  return (
    <>
      <div className="text-center align-content-center justify-content-center">
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm mx-2"
          aria-hidden="true"
        ></span>
        <span role="status">Loading...</span>
      </button>
      </div>
    </>
  );
}
