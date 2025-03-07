import style from "./collection-card.module.scss";
import { Button } from "components/index";
import { ExtendedCollectionInfo } from "types/CollectionInfo";
import { ProfilePictureMap } from "utils/get-unicorn-profile-pic-map";
import forward from "src/icons/arrow_right.svg?raw";
import { Picture as UUPicture } from "components/image/picture";
import { GetPictureResult } from "@astrojs/image/dist/lib/get-picture";

interface CollectionCardProps {
	collection: ExtendedCollectionInfo & { coverPicture?: GetPictureResult };
	headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	unicornProfilePicMap: ProfilePictureMap;
}

export const CollectionCard = ({
	collection,
	headingTag: HeadingTag = "h2",
	unicornProfilePicMap,
}: CollectionCardProps) => {
	return (
		<div className={style.container}>
			<div className={style.topRow}>
				{collection.coverPicture ? (
					<UUPicture
						picture={collection.coverPicture}
						alt=""
						class={style.coverImg}
						imgAttrs={{loading: "lazy", width: 160, height: 240}}
					/>
				) : (
					<img
						alt=""
						src={collection.coverImgMeta.relativeServerPath}
						loading="lazy"
						width={160}
						height={240}
						class={style.coverImg}
					/>
				)}
				<div>
					<HeadingTag className={`text-style-headline-4 ${style.title}`}>
						{collection.title}
					</HeadingTag>
					<p className={`text-style-body-medium`}>{collection.description}</p>
				</div>
			</div>
			<div className={style.bottomRow}>
				<ul className={`unlist-inline ${style.authorList}`} role="list" aria-label="Collection authors">
					{collection.authorsMeta?.map((author) => (
						<li>
							<a
								href={`/unicorns/${author.id}`}
								className={`text-style-button-regular ${style.authorListItem}`}
							>
								<UUPicture
									picture={unicornProfilePicMap.find((u) => u.id === author.id)}
									alt=""
									class={style.authorImage}
								/>
								<span>{author.name}</span>
							</a>
						</li>
					))}
				</ul>

				<Button
					href={`/collections/${collection.slug}`}
					rightIcon={
						<span
							className={style.forwardIcon}
							dangerouslySetInnerHTML={{ __html: forward }}
						/>
					}
				>
					{collection.customChaptersText ?? (
						<>{String(collection.posts.length)} chapters</>
					)}
				</Button>
			</div>
		</div>
	);
};
