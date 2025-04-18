import { useState } from "react";
import { useData } from "../context/data";
import Bridge from "../api/bridge";

export function Settings() {
    const { setBridge } = useData();

    const [apiUrl, setApiUrl] = useState("http://localhost");
    const [apiPort, setApiPort] = useState("8000");

    const applyApiConfig = () => {
        if (apiUrl && apiPort) {
            const fullUrl = `${apiUrl}:${apiPort}`;
            setBridge(new Bridge(fullUrl));
        }
    };

    return (
        <div className="p-4 space-y-8">
            <section>
                <h2 className="text-xl font-semibold mb-2">API Configuration</h2>
                <div className="flex gap-4 mb-4">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="api-url" className="text-sm font-medium">API URL</label>
                        <input
                            id="api-url"
                            type="text"
                            value={apiUrl}
                            onChange={(e) => setApiUrl(e.target.value)}
                            className="border p-2 rounded"
                            placeholder="http://localhost"
                        />
                    </div>
                    <div className="flex flex-col w-40">
                        <label htmlFor="api-port" className="text-sm font-medium">API Port</label>
                        <input
                            id="api-port"
                            type="text"
                            value={apiPort}
                            onChange={(e) => setApiPort(e.target.value)}
                            className="border p-2 rounded"
                            placeholder="8080"
                        />
                    </div>
                </div>
                <button
                    onClick={applyApiConfig}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Apply API Config
                </button>
            </section>
        </div>
    );
};

export default Settings;