import os
import googleapiclient.discovery
from googleapiclient.errors import HttpError

def fetch_youtube_data(video_id):
    """
    Fetch video data and comments from YouTube API
    """
    try:
        # Get API key from environment variable
        api_key = os.environ.get('YOUTUBE_API_KEY')
        if not api_key:
            raise ValueError("YouTube API key not found. Please set YOUTUBE_API_KEY environment variable.")
        
        # Initialize YouTube API client
        youtube = googleapiclient.discovery.build(
            "youtube", "v3", developerKey=api_key, cache_discovery=False
        )
        
        # Get video details
        video_response = youtube.videos().list(
            part="snippet,statistics",
            id=video_id
        ).execute()
        
        if not video_response['items']:
            raise ValueError(f"Video with ID {video_id} not found")
            
        video_data = video_response['items'][0]
        
        # Get comments
        comments_response = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100,  # Adjust as needed
            textFormat="plainText"
        ).execute()
        
        # Extract comment texts
        comments_text = []
        for item in comments_response.get('items', []):
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            comments_text.append(comment)
            
        # Prepare result
        result = {
            'title': video_data['snippet']['title'],
            'likes': int(video_data['statistics'].get('likeCount', 0)),
            'views': int(video_data['statistics'].get('viewCount', 0)),
            'comments_count': int(video_data['statistics'].get('commentCount', 0)),
            'comments_text': comments_text
        }
        
        return result
        
    except HttpError as e:
        error_message = f"YouTube API error: {e.reason}"
        print(error_message)
        raise ValueError(error_message)
    except Exception as e:
        error_message = f"Error fetching YouTube data: {str(e)}"
        print(error_message)
        raise ValueError(error_message)
