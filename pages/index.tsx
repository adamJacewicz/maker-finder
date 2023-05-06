import Head from 'next/head';
import Layout from '@/components/Layout';
import { introSteps } from '@/utils/constants';

export default function Home() {
  return (
    <>

      <div className="flex-wrap flex items-stretch justify-center gap-8 text-center sm:flex relative m-auto">
        {introSteps.map((step, i) => (
          <div
            key={i}
            className="w-full px-4 py-8 rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 bg-base-700"
          >
              <span className="flex items-center font-medium text-xl justify-center w-12 h-12 mx-auto text-white bg-theme-accent rounded-md">
                {i + 1}
              </span>
            <h3 className="py-4 text-2xl font-semibold text-white sm:text-xl">{step.title}</h3>
            <p className="py-4 text-md text-gray-300">{step.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
