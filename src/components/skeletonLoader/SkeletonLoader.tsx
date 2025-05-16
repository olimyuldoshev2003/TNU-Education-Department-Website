// components/SkeletonLoader.tsx
export const SkeletonFaculty = () => (
  <div className="w-[330px] h-[450px] animate-pulse">
    <div className="bg-gray-300 dark:bg-gray-700 w-full h-[390px] rounded-[10px] mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
  </div>
);

export const SkeletonDepartment = () => (
  <div className="h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-full max-w-[400px] mx-auto"></div>
);

export const SkeletonTeacher = () => (
  <div className="w-[300px] h-[350px] animate-pulse">
    <div className="bg-gray-300 dark:bg-gray-700 w-full h-[300px] rounded-[10px] mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

export const SkeletonPublication = () => (
  <div className="w-[250px] h-[300px] animate-pulse">
    <div className="bg-gray-300 dark:bg-gray-700 w-full h-[250px] rounded-[10px] mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

// Publication page loading skeleton
export const PublicationSkeleton = () => (
  <div className="publication_component dark:bg-[#091220] duration-300">
    <div className="block_faculty_component py-5 px-5 max-w-6xl mx-auto duration-300">
      <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
        <div className="faculty_block_1_img">
          <div className="md:w-[330px] h-[390px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-[10px]"></div>
        </div>
        <div className="faculty_block_2 space-y-4 flex-1 max-w-[500px]">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);
