import React from "react";
import DropZoneFile from "./../components/DropZoneFile";
import extensions from "./../assets/json/extensions.json";
import ExtensionCard from "../components/ExtensionCard";

function Extensions() {
  return (
    <div className="px-5 pb-5 pt-10 flex content-start">
      <div className="w-1/2 px-4">
        <h2 className="font-bold text-xl mb-1">Extensions</h2>
        <input
          className="px-2 mb-4 w-full rounded py-2 border border-gray-300 appearance-none focus:outline-none focus:border-pink-800"
          type="text"
          placeholder="Search Extensions"
        />
        <DropZoneFile name="extension folder" />
        <h2 className="font-bold text-xl my-3 py-2 border-b">Installed</h2>

        <div className="grid grid-cols-2 gap-4">
          {extensions &&
            extensions.map((extension) => {
              if (extension.isInstalled)
                return (
                  <ExtensionCard
                    name={extension.name}
                    icon={extension.icon}
                    description={extension.description}
                    isInstalled={extension.isInstalled}
                    hasUpdate={extension.hasUpdate}
                    size={extension.size}
                  />
                );
            })}
        </div>
      </div>
      <div className="w-1/2 px-4">
        <h2 className="font-bold text-xl mb-3 pb-2 border-b">Available</h2>

        <div className="grid grid-cols-2 gap-4">
          {extensions &&
            extensions.map((extension) => {
              if (!extension.isInstalled)
                return (
                  <ExtensionCard
                    name={extension.name}
                    icon={extension.icon}
                    description={extension.description}
                    isInstalled={extension.isInstalled}
                    hasUpdate={extension.hasUpdate}
                    size={extension.size}
                  />
                );
            })}
        </div>
      </div>
    </div>
  );
}

export default Extensions;
