import RequestForm from '../components/requestForm';

export default function RequestPage() {
  return (
    <div className="page">
      <div className="wrapper">
        <div className="py-6 text-center">
          <h1 className="text-5xl font-bold pb-6">Request role</h1>
          <p>Please, select the role for which you want to request permissions</p>
        </div>
        <RequestForm />
      </div>
    </div>
  );
}
