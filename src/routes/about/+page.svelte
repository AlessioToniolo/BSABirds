<script>
	import { marked } from 'marked';

	const content = `# About BSABirds
BSABirds is an Eagle Scout project created by [Alessio Toniolo](https://github.com/AlessioToniolo) of Troop 74 in Atlanta, Georgia.
    The project aims to help the City of Brookhaven keep a track of the popultation counts of many different bird species in the area
    
    ## How It Works
    When someone visits a Brookhaven park, there will be a BSABirds yard sign or flyer on a bulletin board near the entrance/center of the park
    with a QR code to scan. Alternitavely, they can visit [https://bsabirds.herokuapp.com](https://bsabirds.herokuapp.com).
    ---
    On the website, you can visit the Track Birds page to either take a picture of a bird you find in a park, or to enter the species manually.
    Once submitted, a record of this bird sighting will remain in a cloud database.
    
    ## Data Collection
    Since this project does not ID birds individually, there of course is always the possibility that the same bird is recorded more than once.
    However, this issue does not affect population counts because population statistics are measured annually. By only taking the total number
    of sightings at the end of every year, we can measure population changes from year to year with accuracy. In addition, the year constant was chosen
    due to its likelyhood of eliminating data variance
    
    ## Bird Classification
    The most stellar aspect of this project is the bird classificaiton feature in the **Track Birds** page. Based off of a dataset of over 60,000 images
    of birds and 400 species, a machine learning model uses training data from this dataset to make predictions on given images of birds based off of patterns
    observed from the training period.

    ### Final Notes
    BSABirds is only made possible by the everyday users of the app who allow population counts to be accurate and beneficial to the City of Brookhaven's
    environment for birds.
    `;
</script>

<div class="container mx-auto min-width-max flex text-center justify-center pt-5 px-2">
	<article class="prose">{@html marked.parse(content)}</article>
</div>
