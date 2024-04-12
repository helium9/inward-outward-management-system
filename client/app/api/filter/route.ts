import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'; // Assuming you use axios for HTTP requests

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract filter parameters from the request body
      const { inward_number, issue_date, ind_name, dept_name, party_name, claimant_name, subject, amount, status, alloted_to_name } = req.body;

      // Make a request to your database or API to fetch filtered data
      const response = await axios.get('/api/history', {
        params: {
          inward_number,
          issue_date,
          ind_name,
          dept_name,
          party_name,
          claimant_name,
          subject,
          amount,
          status,
          alloted_to_name
        }
      });

      // Extract the filtered data from the response
      const filteredData = response.data;

      // Send the filtered data as a response
      res.status(200).json(filteredData);
    } catch (error) {
      console.error('Error filtering data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Return 405 Method Not Allowed if the request method is not POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
