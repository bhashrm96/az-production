import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@mui/material';

import { fShortenNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';
import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useState, useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function FeedsCard({ feeds, index, setIsUpdate }) {
  const theme = useTheme();
  const router = useRouter();

  const [isLikesModalOpen, setLikesModalOpen] = useState(false);
  const [isCommentsModalOpen, setCommentsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const { title, images, description, created_at, avatarUrl, commentsCount, like_count } = feeds;

  useEffect(() => {
    if (isLikesModalOpen) {
      axios.get(`https://dev-azproduction-api.flynautstaging.com/admin/feedLikes/${feeds.feed_id}`, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken")
        }
      }).then((res) => {
        setLikes(res.data.data.likedUsers)
      })
    }
  }, [isLikesModalOpen])

  useEffect(() => {
    if (isCommentsModalOpen) {
      axios.get(`https://dev-azproduction-api.flynautstaging.com/admin/feedComments/${feeds.feed_id}`, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken")
        }
      }).then((res) => {
        setComments(res.data.data.comments)
      })
    }
  }, [isCommentsModalOpen])

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleOpenLikesModal = () => {
    setLikesModalOpen(true);
  };

  const handleCloseLikesModal = () => {
    setLikesModalOpen(false);
  };

  const handleOpenCommentsModal = () => {
    setCommentsModalOpen(true);
  };

  const handleCloseCommentsModal = () => {
    setCommentsModalOpen(false);
  };

  const handleDeleteFeed = async () => {
    await axios.post('https://dev-azproduction-api.flynautstaging.com/admin/deletefeed', { feedId: feeds.feed_id })
    setIsUpdate(pValue => !pValue);
    setDeleteModalOpen(false);
  };

  return (
    <div
    // onClick={() => router.push(paths.dashboard.feeds.details(index))}
    >
      <Dialog
        fullWidth
        maxWidth={false}
        open={isLikesModalOpen}
        onClose={handleCloseLikesModal}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <DialogTitle>Likes</DialogTitle>

        <DialogContent>
          {likes.length > 0 ? likes.map((likes) => (
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                marginBottom: 2
              }}
            >
              <Avatar alt={likes.first_name} src={likes.profile_pic} sx={{ width: 48, height: 48, mr: 2 }} />

              <ListItemText
                primary={`${likes.first_name} ${likes.last_name}`}
                primaryTypographyProps={{
                  noWrap: true,
                  typography: 'subtitle2',
                }}
                secondaryTypographyProps={{
                  mt: 0.5,
                  noWrap: true,
                  display: 'flex',
                  component: 'span',
                  alignItems: 'center',
                  typography: 'caption',
                  color: 'text.disabled',
                }}
              />
            </Card>
          )) : 'No likes yet!'}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleCloseLikesModal}>
            Close
          </Button>

        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth={false}
        open={isCommentsModalOpen}
        onClose={handleCloseCommentsModal}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <DialogTitle>Comments</DialogTitle>

        <DialogContent>
          {comments.length > 0 ? comments.map((comments) => (
            <Card
              style={{
                display: 'flex',
                alignItems: 'start',
                padding: 12,
                marginBottom: 12
              }}
            >
              <Avatar alt={comments.user_first_name} src={comments.user_profile_pic} sx={{ width: 48, height: 48, mr: 2 }} />

              <div>
                <ListItemText
                  primary={`${comments.user_first_name} ${comments.user_last_name}`}
                  secondary={new Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }).format(new Date(Date.parse(comments.comment_created_at)))}
                  primaryTypographyProps={{
                    noWrap: true,
                    typography: 'subtitle2',
                  }}
                  secondaryTypographyProps={{
                    mt: 0.5,
                    noWrap: true,
                    display: 'flex',
                    component: 'span',
                    alignItems: 'center',
                    typography: 'caption',
                    color: 'text.disabled',
                  }}
                />

                <ListItemText
                  primary={comments.content}
                  primaryTypographyProps={{
                    noWrap: true,
                    typography: 'subtitle2',
                  }}
                  secondaryTypographyProps={{
                    mt: 0.5,
                    noWrap: true,
                    display: 'flex',
                    component: 'span',
                    alignItems: 'center',
                    typography: 'caption',
                    color: 'text.disabled',
                  }}
                  sx={{
                    marginTop: 2
                  }}
                />
              </div>

            </Card>
          )) : 'No comments yet!'}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleCloseCommentsModal}>
            Close
          </Button>

        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth={false}
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <DialogTitle>Delete Feed</DialogTitle>

        <DialogContent>
          Do you really want to delete this feed?
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleDeleteFeed}>
            Yes
          </Button>
          <Button variant="outlined" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
      <Card sx={{ textAlign: 'center' }}>

        <Box
          display="grid"
          gridTemplateColumns="repeat(1, 1fr)"
          sx={{ py: 2, px: 2, typography: 'subtitle1', display: 'flex', alignItems: "center", justifyContent: 'start' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <Avatar
                alt={title ? title : "title"}
                src={avatarUrl}
                sx={{
                  width: 40,
                  height: 40,
                  zIndex: 11,
                }}
              />
              <div style={{ marginLeft: "0.5rem", display: 'flex', flexDirection: "column" }}>
                <small style={{ textAlign: "left" }}>Username</small>
                <small style={{ color: "grey", textAlign: "left" }}>{new Intl.DateTimeFormat('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }).format(new Date(Date.parse(created_at)))}</small>
              </div>
            </div>
          </div>

          <div style={{
            cursor: 'pointer',
          }}
            onClick={handleOpenDeleteModal}>

            <Iconify
              style={{ color: 'red' }}
              width={24}
              icon="iconamoon:trash-bold"
            />

          </div>
        </Box>

        <ListItemText
          sx={{ mb: 1, px: 2 }}
          // primary={title ? title : "title"}
          secondary={description ? description : "description"}
          primaryTypographyProps={{ typography: 'subtitle1', textAlign: "left" }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5, textAlign: "left" }}
        />

        <Box sx={{ position: 'relative' }}>
          {/* <AvatarShape
            sx={{
              left: 0,
              right: 0,
              zIndex: 10,
              mx: 'auto',
              bottom: -26,
              position: 'absolute',
            }}
          /> */}

          {images.length > 0 && <Image
            src={images.length > 0 && images[0].url}
            alt={title}
            ratio="16/9"
          // overlay={alpha(theme.palette.grey[900], 0.48)}
          />}

          <div style={{ display: 'flex', padding: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '10px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
              onClick={handleOpenCommentsModal}
            >
              <Iconify
                width={24}
                icon="iconamoon:comment-bold"
              />
              <Typography
                variant="body2"
                sx={{
                  ml: 0.5
                }}
              >
                {commentsCount}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '1rem',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
              onClick={handleOpenLikesModal}
            >
              <Iconify
                width={24}
                icon="iconamoon:like-bold"
              />
              <Typography
                variant="body2"
                sx={{
                  ml: 0.5
                }}
              >
                {like_count}
              </Typography>
            </div>

          </div>
        </Box>

        {/* <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack> */}
      </Card>
    </div>
  );
}

FeedsCard.propTypes = {
  feeds: PropTypes.object,
};
