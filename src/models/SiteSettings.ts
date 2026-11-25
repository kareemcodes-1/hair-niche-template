import mongoose, { Schema, models } from 'mongoose';

const SiteSettingsSchema = new Schema(
  {
    businessName: {
      type: String,
      default: 'Your Business',
    },
    logoUrl: {
      type: String,
      default: '',
    },
    hero: {
      mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image',
      },
      mediaUrl: {
        type: String,
        default: '/test-home.jpg',
      },
      title: {
        type: String,
        default: 'Beauty Essentials Made for You',
      },
      description: {
        type: String,
        default:
          'Shop luxurious wigs, hair extensions, lashes, and beauty essentials designed to elevate your everyday look.',
      },
    },
    aboutText: {
      type: String,
      default:
        'We are a growing hair extension brand offering premium-quality products designed for natural looks, lasting durability, and everyday confidence.',
    },
    ctaImageUrl: {
      type: String,
      default:
        'https://i.pinimg.com/736x/fe/49/6e/fe496edf593f53a3d19f4b9df95def76.jpg',
    },
  },
  { timestamps: true }
);

export default models.SiteSettings ||
  mongoose.model('SiteSettings', SiteSettingsSchema);