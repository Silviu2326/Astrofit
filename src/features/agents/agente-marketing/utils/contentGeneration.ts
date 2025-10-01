
import { SocialMediaPost, SocialMediaType, PostType } from '../types/socialMedia';
import { Campaign } from '../types/campaign';

/**
 * Generates a motivational fitness post for social media.
 * @param platform The social media platform.
 * @param campaign Optional campaign context.
 * @returns A generated SocialMediaPost object.
 */
export function generateMotivationalFitnessPost(platform: SocialMediaType, campaign?: Campaign): SocialMediaPost {
  const motivationalQuotes = [
    '¡Tu cuerpo puede lograr lo que tu mente crea! #FitnessMotivation',
    'Cada día es una nueva oportunidad para ser más fuerte. ¡No te rindas! #Entrenamiento',
    'La disciplina es el puente entre tus metas y tus logros. #VidaSaludable',
    'Invierte en tu salud, es la mejor inversión. #Bienestar',
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const hashtags = ['Fitness', 'Salud', 'Motivacion', 'Ejercicio'];

  if (campaign) {
    hashtags.push(...campaign.goals.map(goal => goal.split(' ')[0].replace(/[^a-zA-Z0-9]/g, ''))); // Add campaign-related hashtags
  }

  return {
    id: `post-gen-${Date.now()}`,
    platform,
    type: PostType.Text,
    content: randomQuote,
    caption: randomQuote,
    hashtags: Array.from(new Set(hashtags)), // Remove duplicates
    scheduledDate: new Date(),
    campaignId: campaign?.id,
  };
}

/**
 * Generates a post promoting a specific fitness product or service.
 * @param platform The social media platform.
 * @param productName The name of the product/service.
 * @param callToAction A call to action message.
 * @param imageUrl Optional URL for an image creative.
 * @param campaign Optional campaign context.
 * @returns A generated SocialMediaPost object.
 */
export function generateProductPromotionPost(
  platform: SocialMediaType,
  productName: string,
  callToAction: string,
  imageUrl?: string,
  campaign?: Campaign
): SocialMediaPost {
  const caption = `¡Descubre nuestro nuevo ${productName} y lleva tu entrenamiento al siguiente nivel! ${callToAction} #${productName.replace(/\s/g, '')} #OfertaFitness`;
  const hashtags = [productName.replace(/\s/g, ''), 'Fitness', 'Promocion'];

  if (campaign) {
    hashtags.push(...campaign.goals.map(goal => goal.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '')));
  }

  return {
    id: `post-gen-${Date.now()}`,
    platform,
    type: imageUrl ? PostType.Image : PostType.Text,
    content: imageUrl || caption,
    caption,
    hashtags: Array.from(new Set(hashtags)),
    scheduledDate: new Date(),
    campaignId: campaign?.id,
  };
}

/**
 * Generates a question-based engagement post.
 * @param platform The social media platform.
 * @param question The question to ask.
 * @param campaign Optional campaign context.
 * @returns A generated SocialMediaPost object.
 */
export function generateEngagementQuestionPost(platform: SocialMediaType, question: string, campaign?: Campaign): SocialMediaPost {
  const hashtags = ['PreguntaFitness', 'ComunidadFitness', 'DebateSalud'];

  if (campaign) {
    hashtags.push(...campaign.goals.map(goal => goal.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '')));
  }

  return {
    id: `post-gen-${Date.now()}`,
    platform,
    type: PostType.Text,
    content: question,
    caption: question + ' ¡Déjanos tu respuesta en los comentarios! #' + hashtags.join(' #'),
    hashtags: Array.from(new Set(hashtags)),
    scheduledDate: new Date(),
    campaignId: campaign?.id,
  };
}
