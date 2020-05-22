import tickets from '../assets/tickets.json';

export default function searchEntity(entity, searchKey, searchTerm) {
  console.log(entity, searchKey, searchTerm);
  return tickets;
}
