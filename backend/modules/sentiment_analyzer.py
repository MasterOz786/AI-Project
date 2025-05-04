from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np

# Load model and tokenizer
model_name = "cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = None
model = None

# Label mapping
label_map = {
    0: "negative",
    1: "neutral",
    2: "positive"
}

def load_model():
    """
    Load the sentiment analysis model and tokenizer
    """
    global tokenizer, model
    
    if tokenizer is None or model is None:
        print("Loading sentiment analysis model...")
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSequenceClassification.from_pretrained(model_name)
        print("Model loaded successfully")

def analyze_text(text):
    """
    Analyze sentiment of a single text
    """
    # Ensure model is loaded
    if tokenizer is None or model is None:
        load_model()
    
    # Tokenize and get prediction
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get prediction
    scores = torch.nn.functional.softmax(outputs.logits, dim=1)
    prediction = torch.argmax(scores, dim=1).item()
    
    return {
        "label": label_map[prediction],
        "score": scores[0][prediction].item(),
        "scores": {label_map[i]: score.item() for i, score in enumerate(scores[0])}
    }

def analyze_comments(comments):
    """
    Analyze sentiment of multiple comments and return aggregated results
    """
    # Ensure model is loaded
    if tokenizer is None or model is None:
        load_model()
    
    if not comments:
        return {
            "positive": 0,
            "negative": 0,
            "neutral": 1  # Default to neutral if no comments
        }
    
    # Initialize counters
    sentiment_counts = {
        "positive": 0,
        "negative": 0,
        "neutral": 0
    }
    
    # Analyze each comment
    for comment in comments:
        result = analyze_text(comment)
        sentiment_counts[result["label"]] += 1
    
    # Calculate proportions
    total_comments = len(comments)
    sentiment_proportions = {
        "positive": sentiment_counts["positive"] / total_comments,
        "negative": sentiment_counts["negative"] / total_comments,
        "neutral": sentiment_counts["neutral"] / total_comments
    }
    
    return sentiment_proportions
