"use client";
import { useEffect, useState } from 'react'
import axios from 'axios'
const API_URL = '/api/';

export default function FormDetails() {
  return <>
    <div>
      <Order uri={`${API_URL}form`} name="Form" />
    </div>
  </>
}


function Order({ uri, name }: any) {
  const [data, setdata] = useState<any[]>([]);
  const [show, setshow] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');

  const fectchdata = async () => {
    try {
      const response = await axios.get(uri);
      setdata(response.data);
      setshow(true);
    } catch (err) {
      setshow(false);
      console.log('server sleeping ... retrying');
      setTimeout(fectchdata, 2000);
    }
  };

  useEffect(() => {
    fectchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData = data.filter((item) => {
    const searchMatch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const serviceMatch = serviceFilter === 'All' || item.service === serviceFilter;
    return searchMatch && serviceMatch;
  });

  const uniqueServices = ['All', ...Array.from(new Set(data.map((item) => item.service).filter(Boolean)))] as string[];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{name} Management</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none min-w-[250px]"
            />
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {uniqueServices.map((service, i) => (
                <option key={i} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          {show ? (
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden border rounded-xl border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget</th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.length > 0 ? (
                          filteredData.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4 whitespace-nowrap text-xs text-gray-500 font-mono">#{String(item._id).slice(-6)}</td>
                              <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                              <td className="p-4 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
                              <td className="p-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                <span className="px-2.5 py-1 bg-blue-50 rounded-full">{item.service || '-'}</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm text-green-600 font-semibold">{item.budget || '-'}</td>
                              <td className="p-4 text-sm text-gray-500 max-w-xs truncate">{item.message || '-'}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500">
                              No records found matching your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}