import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Certificate from "./Certificate";
import PageLoader from "./PageLoader";

const VerifyForm = lazy(() => import("./VerifyForm"));

const Verify = () => {
	const [searchParams] = useSearchParams();

	const ipfsHash = searchParams.get('ipfsHash');
	console.log({params: typeof(ipfsHash)})

	return searchParams.has("ipfsHash") ? (
		<div className="view">
			<Certificate
				ipfsHash={ipfsHash}
			/>
		</div>
	) : (
		<Suspense fallback={<PageLoader />}>
			<VerifyForm />
		</Suspense>
	);
};

export default Verify;
