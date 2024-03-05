import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { useMockedCommunity } from 'src/hooks/use-mocked-community';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProfilePostItem({ post, setIsUpdate }) {
  const { community } = useMockedCommunity();

  const [isLikesModalOpen, setLikesModalOpen] = useState(false);
  const [isCommentsModalOpen, setCommentsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  const commentRef = useRef(null);

  const fileRef = useRef(null);

  const [message, setMessage] = useState('');

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
    await axios.delete(`https://dev-azproduction-api.flynautstaging.com/admin/delete-post/${post.id}`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    })
    setIsUpdate(pValue => !pValue);
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    if (isLikesModalOpen) {
      axios.get(`https://dev-azproduction-api.flynautstaging.com/community/postLikes/${post.id}`, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken")
        }
      }).then((res) => {
        setLikes(res.data.data)
      })
    }
  }, [isLikesModalOpen])

  useEffect(() => {
    if (isCommentsModalOpen) {
      axios.get(`https://dev-azproduction-api.flynautstaging.com/community/postComments/${post.id}`, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken")
        }
      }).then((res) => {
        setComments(res.data.data)
      })
    }
  }, [isCommentsModalOpen])

  const renderHead = (
    <CardHeader
      disableTypography
      avatar={<Avatar src={post?.photoURL} alt={post?.user_name} />}
      title={
        <Link color="inherit" variant="subtitle1">
          {post?.user_email}
        </Link>
      }
      subheader={
        <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
          {fDate(post.created_at)}
        </Box>
      }
      action={
        <IconButton onClick={handleOpenDeleteModal}>
          <Iconify color='red' icon="iconamoon:trash-bold" />
        </IconButton>
      }
    />
  );

  // const renderCommentList = (
  //   <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
  //     {post.comments.map((comment) => (
  //       <Stack key={comment.id} direction="row" spacing={2}>
  //         <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />

  //         <Paper
  //           sx={{
  //             p: 1.5,
  //             flexGrow: 1,
  //             bgcolor: 'background.neutral',
  //           }}
  //         >
  //           <Stack
  //             sx={{ mb: 0.5 }}
  //             alignItems={{ sm: 'center' }}
  //             justifyContent="space-between"
  //             direction={{ xs: 'column', sm: 'row' }}
  //           >
  //             <Box sx={{ typography: 'subtitle2' }}>{comment.author.name}</Box>

  //             <Box sx={{ typography: 'caption', color: 'text.disabled' }}>
  //               {fDate(comment.createdAt)}
  //             </Box>
  //           </Stack>

  //           <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{comment.message}</Box>
  //         </Paper>
  //       </Stack>
  //     ))}
  //   </Stack>
  // );

  // const renderInput = (
  //   <Stack
  //     spacing={2}
  //     direction="row"
  //     alignItems="center"
  //     sx={{
  //       p: (theme) => theme.spacing(0, 3, 3, 3),
  //     }}
  //   >
  //     <Avatar src={community?.photoURL} alt={community?.displayName} />

  //     <InputBase
  //       fullWidth
  //       value={message}
  //       inputRef={commentRef}
  //       placeholder="Write a comment…"
  //       onChange={handleChangeMessage}
  //       endAdornment={
  //         <InputAdornment position="end" sx={{ mr: 1 }}>
  //           <IconButton size="small" onClick={handleAttach}>
  //             <Iconify icon="solar:gallery-add-bold" />
  //           </IconButton>

  //           <IconButton size="small">
  //             <Iconify icon="eva:smiling-face-fill" />
  //           </IconButton>
  //         </InputAdornment>
  //       }
  //       sx={{
  //         pl: 1.5,
  //         height: 40,
  //         borderRadius: 1,
  //         border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
  //       }}
  //     />

  //     <input type="file" ref={fileRef} style={{ display: 'none' }} />
  //   </Stack>
  // );

  const renderActions = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(2, 3, 3, 3),
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1rem',
        cursor: 'pointer',
        '&:hover': {
          color: 'primary.main',
        },
      }} onClick={handleOpenLikesModal}>
        <Iconify width={24} icon="iconamoon:like-bold" />

        <Typography
          variant="body2"
          sx={{
            ml: 0.5
          }}
        >
          {post.like_count}
        </Typography>
      </div>
      {/* 
      {!!post.personLikes.length && (
        <AvatarGroup
          sx={{
            [`& .${avatarGroupClasses.avatar}`]: {
              width: 32,
              height: 32,
            },
          }}
        >
          {post.personLikes.map((person) => (
            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </AvatarGroup>
      )} */}


      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1rem',
        cursor: 'pointer',
        '&:hover': {
          color: 'primary.main',
        },
      }} onClick={handleOpenCommentsModal}>
        <Iconify width={24} icon="iconamoon:comment-bold" />

        <Typography
          variant="body2"
          sx={{
            ml: 0.5
          }}
        >
          {post.comment_count}
        </Typography>
      </div>
    </Stack>
  );

  return (
    <Card>
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
              <Avatar alt={likes.user_first_name} src={likes.user_profile_pic} sx={{ width: 48, height: 48, mr: 2 }} />

              <ListItemText
                primary={`${likes.user_first_name} ${likes.user_last_name}`}
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
        onClose={handleCloseCommentsModal}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <DialogTitle>Delete post</DialogTitle>

        <DialogContent>
          Do you really want to delete this post?
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
      {renderHead}

      <Typography
        variant="body2"
        sx={{
          p: (theme) => theme.spacing(3, 3, 2, 3),
        }}
      >
        {post.post_text}
      </Typography>

      <Box sx={{ p: 1 }}>
        <Image alt={post.post_title} src={post.pic} ratio="16/9" sx={{ borderRadius: 1.5 }} />
      </Box>

      {renderActions}

      {/* {!!post.comments.length && renderCommentList} */}

      {/* {renderInput} */}
    </Card>
  );
}

ProfilePostItem.propTypes = {
  post: PropTypes.object,
};
