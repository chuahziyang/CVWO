# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


require 'date'

user1 = User.create(name:"Chuah Zi Yang", email:"czyang2002@gmail.com", password:"123456")
user2 = User.create(name:"Sally", email:"testetst@gmail.com", password:"123456asd")


post1 = Post.create(name:"Calories", category:"Politics", status:"offline", description:"This is a test post", created_at: DateTime.now, environment:"Active", user:user1, content:"hi, this is gonna be a long post so if you dont take CS (or CS2106) then you may just skip this…
There is something really fishy going on in the grading of CS2106 this semester. This mod is taught by Prof Colin and Prof Jialin. For context, our grades consist of 20% midterms, 25% labs, 5% attendance and 50% finals. For labs, we can choose to do them with a lab partner. So I did the labs with a lab partner. However, since only one of us needs to submit the labs, i submitted all the labs while my partner did not.
Midway through the semester, my partner sounded out that all of her lab grades on canvas were considered “missing”. I asked my lab TA on behalf of my lab partner (1st slide). In summary, he told us that this was normal and it would not affect the overall grading.
Fast forward to results day, my lab partner scored really bad (C) for CS2106. She scored close to full marks for midterms, full marks for participation and close to full marks for labs. So that would be close to 50% of her grade secured before even taking finals. So what are the odds of scoring C despite scoring so well before finals? FYI, I failed almost every assessment and exam in CS1101S and still scored a C+.
Anyway, something weird was up. My partner noted that her lab scores on canvas were still considered “missing” (2nd slide). We immediately suspect that the lab scores may not have been accounted for during grading.
Well, it turns out that several people that I know are facing this issue. They have missing lab scores on canvas, and they scored way below their expectation (B- and below). One of them emailed Prof Colin, who then replied back to him saying that it is his responsibility to check his canvas grades and report any mistakes (3rd slide)
But this directly contradicted to what Prof Colin himself told the lab TAs. He told them that there was no need to include the lab grades for both partners on canvas. (4th slide) So who is at fault here, is it the TAs, or the profs, or the students…?
Another lab TA (through my friend) said that the lab TAs should eventually key in the scores into canvas for every student regardless of who submitted the labs (5th slide).
Prof Colin has replied back to some of my friends saying that the lab results were all accounted for during grading. Well, there is still the slim possibility that they might have flunked their finals so bad that their grades dropped way below their expected range, but clearly there is some lack of accountability, regulation and transparency in the grading system.
Are any of you facing the same problem? Is there any way to bring this issue up to a higher management?")
post2 = Post.create(name:"Ice Cream", category:"Events", status:"online", description:"This is a test post", created_at: DateTime.now, environment:"Active",user:user1, content:"There will now be a minimum karma and account age to post. Too much shitposting and weird spammers.
If there's something you want to report or whistleblow about NUS, please DM us directly. Thanks! (Make sure whatever you want to say is factual and bring receipts. Don't make the same mistake that NUS lawyer student did when she posted about the NTU saga 💀💀💀)
Edit: Perhaps a few examples might help.
Asking about dating as a straight male CS student would be an acceptable shitpost tier ad nauseam topic.
Talking about some dumb meme w.r.t u/lowtierstudent would be acceptable meta shitposting.
Creating a new account to whistleblow about CS2106, after DMing the mods, is totally acceptable.
Spamming this kind https://www.reddit.com/r/nus/content/18uujbp/a_person_from_a_different_ethnic_group_thinks/ is unacceptable.")
post3 = Post.create(name:"Pizza", category:"Technology", status:"offline", description:"This is a test post", created_at: DateTime.now, environment:"Active",user:user1, content:"Been thinking this a long time, but now that I should make a decision whether to take it up, its getting frustrating.
Why on earth is it called second major in MANAGEMENT. Makes it sound like the whole second major is just the management modules and concentrations when it should just be called second major in BUSINESS. Especially since I would mainly be going for the finance and accounting modules. The whole thing is just so dumb.")
post4 = Post.create(name:"Niqqis", category:"Music", status:"online", description:"This is a test post", created_at: DateTime.now, environment:"Closed",user:user2, content:"I’m an exchange student studying at NUS this upcoming semester. I’m planning to bid for some courses during the “submit course requests” period, so I’d like to look at the vacancy reports. However, I don’t understand what the round numbers before each vacancy report mean. Which vacancy report round should I be looking at to plan the courses I’ll bid for?")
post5 = Post.create(name:"Al Amman", category:"Politics", status:"offline", description:"This is a test post", created_at: DateTime.now, environment:"Active",user:user2, content:"Trying to plan timetable rn & need to know if lectures are recorded & how many lectures have to be in-person for the quiz")

Comment.create(content:"This is a test comment", user:user1, post:post1)
