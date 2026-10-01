import { PageProps } from '../../../../../../.next/types/app/page';
import Application from './Application';

interface Props extends PageProps {
  params: Promise<{ jobtitle: string }>
}

const page = async ({ params }: Props) => {
  const jobTitle = (await params).jobtitle;

  return <Application jobTitle={jobTitle} />;
};

export default page;