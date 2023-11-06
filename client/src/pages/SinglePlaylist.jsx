import { useParams } from 'react-router-dom';
import PlayList from '../components/PlayList/index';

const SinglePlaylist = () => {
  let { id } = useParams();

  return (
    <div>
      <PlayList id={id} />
    </div>
  );
};

export default SinglePlaylist;
