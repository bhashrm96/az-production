import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Lightbox, { useLightBox } from 'src/components/lightbox';

// ----------------------------------------------------------------------

export default function ProfileGallery({ gallery, data }) {
  const theme = useTheme();

  const slides = gallery.map((slide) => ({
    src: slide.imageUrl,
  }));

  const lightbox = useLightBox(slides);

  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Portfolio
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {data.map((image) => (
          <Card key={image.id} sx={{ cursor: 'pointer', color: 'common.white' }}>
            <ListItemText
              sx={{
                p: 3,
                left: 0,
                width: 1,
                bottom: 0,
                zIndex: 9,
                position: 'absolute',
              }}
              primary={image.portfolio_name}
              secondary={image.client_name}
              primaryTypographyProps={{
                noWrap: true,
                typography: 'subtitle1',
              }}
              secondaryTypographyProps={{
                mt: 0.5,
                color: 'inherit',
                component: 'span',
                typography: 'body2',
                sx: { opacity: 0.48 },
              }}
            />

            <Image
              alt="gallery"
              ratio="1/1"
              src={image.photos.length > 0 ? image.photos[0].url : null}
              onClick={() => lightbox.onOpen(image.imageUrl)}
              overlay={`linear-gradient(to bottom, ${alpha(theme.palette.grey[900], 0)} 0%, ${theme.palette.grey[900]
                } 75%)`}
            />
          </Card>
        ))}
      </Box>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

ProfileGallery.propTypes = {
  gallery: PropTypes.array,
};
