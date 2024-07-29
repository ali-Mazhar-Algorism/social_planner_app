from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.campaign import Campaign
from facebook_business.adobjects.customaudience import CustomAudience
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.adcreative import AdCreative
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.adpreview import AdPreview
from facebook_business.api import FacebookAdsApi


access_token = ''
app_secret = ''
ad_account_id = ''
audience_name = ''
audience_retention_days = ''
pixel_id = ''
app_id = ''
FacebookAdsApi.init(access_token=access_token)

fields = [
]
params = {
    'name': 'My Campaign',
    'buying_type': 'AUCTION',
    'objective': 'OUTCOME_ENGAGEMENT',
    'status': 'PAUSED',
    'special_ad_categories': []
}
campaign = AdAccount(ad_account_id).create_campaign(
    fields=fields,
    params=params,
)
print ('campaign', campaign)

campaign_id = campaign.get_id()
print ('campaign_id:', campaign_id, '\n')

fields = [
]
params = {
    'pixel_id': pixel_id,
    'name': audience_name,
    'retention_days': audience_retention_days,
    'prefill': True,
    'subtype': 'CUSTOM',  # Add this line
    'customer_file_source': 'USER_PROVIDED_ONLY'  # Add this line
}
custom_audience = AdAccount(ad_account_id).create_custom_audience(
    fields=fields,
    params=params,
)
print ('custom_audience', custom_audience)


custom_audience_id = custom_audience.get_id()
print ('custom_audience_id:', custom_audience_id, '\n'
)
fields = [
]
params = {
    'name': 'My AdSet',
    'optimization_goal': 'REACH',
    'billing_event': 'IMPRESSIONS',
    'bid_amount': '20',
    'daily_budget': '1000',
    'campaign_id': campaign_id,
    'targeting': {'custom_audiences':[{'id':custom_audience_id}], 'geo_locations':{'countries':['US']}},
    'status': 'PAUSED',
}
ad_set = AdAccount(ad_account_id).create_ad_set(
    fields=fields,
    params=params,
)
print ('ad_set', ad_set)

ad_set_id = ad_set.get_id()
print ('ad_set_id:', ad_set_id, '\n')

fields = [
]
params = {
    'name': 'My Creative',
    'title': 'My Page Like Ad',
    'body': 'Like My Page',
    'object_url': 'www.facebook.com',
    'link_url': 'www.facebook.com',
    'image_url': 'http://www.facebookmarketingdevelopers.com/static/images/resource_1.jpg',
}
creative = AdAccount(ad_account_id).create_ad_creative(
    fields=fields,
    params=params,
)
print ('creative', creative)

creative_id = creative.get_id()
print ('creative_id:', creative_id, '\n')

fields = [
]
params = {
    'name': 'My Ad',
    'adset_id': ad_set_id,
    'creative': {'creative_id':creative_id},
    'status': 'PAUSED',
}
ad = AdAccount(ad_account_id).create_ad(
    fields=fields,
    params=params,
)
print ('ad', ad)

ad_id = ad.get_id()
print ('ad_id:', ad_id, '\n')

fields = [
]
params = {
    'ad_format': 'DESKTOP_FEED_STANDARD',
}
print(Ad(ad_id).get_previews(
    fields=fields,
    params=params,
))

